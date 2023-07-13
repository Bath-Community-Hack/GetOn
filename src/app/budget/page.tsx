import QuizTemplate from "@/ServerComponents/QuizTemplate";

export default function Budget(
  {searchParams:{postCode}}:{searchParams:{postCode:string}}
) {
  return <QuizTemplate>
    <div>hello uh your postcode is {postCode} ok bye</div>
    <div>
      <a href="/usage" className="text-lg text-blue-800 underline hover:text-blue-400 cursor-pointer">next</a>
    </div>
  </QuizTemplate>
}
