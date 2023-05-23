import Louis from "../assets/Louis.png";

const TextAndImage = () => {
  return (
    <div className="flex mt-12">
      <div className="pe-3">
        <h2 className="mt-0">Some fun facts about me</h2>
        <ul className="ps-4">
          <li>
            I compete in Brazilian Jiu Jitsu🥋 and recreationaly train Kick
            Boxing🥊
          </li>
          <li>
            I love playing video games with my wife like Zelda: Breath of the
            Wild and Minecraft🕹
          </li>
          <li>I play in a weekly Dungeons and Dragons game🐉🎲</li>
        </ul>
      </div>
      <div className="w-11/12 h-full">
        <img
          src={Louis}
          alt="Louis Riddle"
          className="object-center object-cover h-64 m-0"
        />
      </div>
    </div>
  );
};

export default TextAndImage;
