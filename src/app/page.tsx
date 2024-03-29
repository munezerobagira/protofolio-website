"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import User from "@/types/User";
import LoadingBall from "@/components/LoadingBall";

import { data } from "@/data";
import HelloWorldExtesion from "@/utils/Terminal/extensions/helloworld";
import ManExtension from "@/utils/Terminal/extensions/man";
import HelpExtension from "@/utils/Terminal/extensions/help";
import ClearExtension from "@/utils/Terminal/extensions/clear";
import useTerminal from "@/hooks/useTerminal";
const AnimatedStack = ({ items }: { items: string[] }) => {
  const itemsLength = items.length;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const data = useMemo(() => items[activeItemIndex], [activeItemIndex, items]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItemIndex((previous) => {
        if (previous == itemsLength - 1) return 0;
        return previous + 1;
      });
    }, 100);
    return clearInterval(interval);
  }, [items, itemsLength]);

  return (
    <div className="stack">
      <h1 className="text-6xl md:text-8xl  leading-[3rem] font-bold" id="keywords">
        {data}
      </h1>
    </div>
  );
};
function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [creatorInfo, setCreatorInfo] = useState<User>({});
  const terminalContainer = useRef(null);
  useEffect(() => {
    (async () => {
      setCreatorInfo(data.user);
      setIsLoading(false);
    })();
  }, []);
  useEffect(() => {
    if (
      terminalContainer.current &&
      terminalContainer.current?.childNodes.length < 1
    ) {
      const { terminal } = useTerminal({ container: terminalContainer.current });
      terminal;
    }
  }, [terminalContainer]);
  if (isLoading) return <LoadingBall />;
  return (
    <>
      <section className="hero min-h-screen ">
        <div className="text-center">
          {creatorInfo.keywords && (
            <AnimatedStack items={creatorInfo.keywords.split(",") ?? []} />
          )}

          <p className="my-4">{creatorInfo.info}</p>
          <div>
            <button className="btn btn-primary">Hire me</button>
          </div>
        </div>
      </section>
      <section className="min-h-screen flex items-stretch py-6 ">
        <div id="terminal" className="w-full" ref={terminalContainer}></div>
      </section>
    </>
  );
}

export default Index;

