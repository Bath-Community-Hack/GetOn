import PostcodeInputLive from "@/ClientComponents/PostcodeInputLive"
import QuizTemplate from "@/ServerComponents/QuizTemplate"

export default function Location() {
  return <QuizTemplate>
    <div className="w-full flex-grow flex flex-col justify-center items-center">
      <div>
        <div className="flex justify-between">
          <div className="text-[#25A]">
            What is your postcode?
          </div>
          <div>ℹ</div>
        </div>
        <div>
          <PostcodeInputLive />
        </div>
      </div>
      <div className="h-16"/>
      <div>
        <a href="/budget" className="text-lg text-blue-800 underline hover:text-blue-400">
          Step 2 of 4
        </a>
      </div>
    </div>
  </QuizTemplate>
}
