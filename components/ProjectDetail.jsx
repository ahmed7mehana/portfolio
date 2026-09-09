import Link from "next/link";
import { RiRadioButtonFill } from "react-icons/ri";
import PortfolioAvatar from "./PortfolioAvatar";

export default function ProjectDetail({ title, image, stack, description, demo, buy = "https://wa.me/+201558533755", price = "5" }) {
  return (
    <main className="w-full">
      <section className="relative h-[50vh] w-full">
        <div className="absolute left-0 top-0 z-10 h-[50vh] w-full bg-black/70" />
        <PortfolioAvatar label={title} src={image} className="project-detail-avatar" />
        <div className="absolute left-1/2 top-[70%] z-10 w-full max-w-[1240px] -translate-x-1/2 -translate-y-1/2 p-2 text-white">
          <h1 className="py-2 text-4xl font-bold md:text-6xl">{title}</h1>
          <h2>{stack.join(" / ")}</h2>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-8 p-2 py-8 md:grid-cols-5">
        <div className="md:col-span-4">
          <p>Project</p>
          <h2>Overview</h2>
          <p className="max-w-3xl leading-8 text-gray-600">{description}</p>
          <a href={buy} target="_blank" rel="noreferrer">
            <p className="mt-5 text-xs font-bold uppercase">If you want to build something similar, get in touch.</p>
            <button className="mr-8 mt-4 px-8 py-2">Buy ({price}$)</button>
          </a>
          <a href={demo} target="_blank" rel="noreferrer">
            <button className="mt-4 px-8 py-2">Demo</button>
          </a>
        </div>

        <aside className="rounded-xl py-4 shadow-xl shadow-gray-400 md:col-span-1">
          <p className="pb-2 text-center font-bold">Technologies</p>
          <div className="grid grid-cols-2 px-2 md:grid-cols-1">
            {stack.map((item) => (
              <p key={item} className="flex items-center py-2 text-gray-600">
                <RiRadioButtonFill className="pr-1" /> {item}
              </p>
            ))}
          </div>
        </aside>

        <Link href="/#projects" className="underline">Back</Link>
      </section>
    </main>
  );
}
