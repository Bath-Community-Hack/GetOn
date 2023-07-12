{
  description = "next js launcher";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    /*nix-sandbox.url = "git+file:./nix-sandbox?ref=main";*/
    /*nix-shell-tools.url = "git+file:./nix-shell-tools?ref=main";*/
  };

  outputs = { self, nixpkgs, flake-utils,
              /*nix-sandbox, nix-shell-tools*/ }:
    let systems = ["x86_64-linux"];
    in flake-utils.lib.eachSystem systems (system:
      let pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default =
          (import ./nix-shell-tools/launch-in-screens.nix)
            pkgs
            (launch-screen-pkgs: getLaunchScriptFromCommands:
              let launch-screen = getLaunchScriptFromCommands
                [
                  { name = "next.js";
                    command = ''
                      npm install
                      npm run dev
                    '';
                    port = 3000;
                    sgr = ''\033[1;95m'';
                  }
                ];
              in
                (import ./nix-sandbox/sandboxed-shell-docker.nix)
                  {
                    pkgs = pkgs;
                    tools = (launch-screen-pkgs ++ [
                      pkgs.coreutils
                      pkgs.hostname
                      pkgs.nodejs
                    ]);
                    portMappings = [
                      {host="127.0.0.1:3000"; container=3000;}
                    ];
                    shellHook = ''
                      ${launch-screen}
                    '';
                  }
            );
      }
    );
}
