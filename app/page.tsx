'use client'

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Reorder } from "framer-motion";

export default function Home() {
  const [pages, setPages] = useState(['one', 'two', 'three', 'four', 'five']);

  return (
    <main className="w-[100dvw] h-[100dvh] bg-primary p-10 overflow-x-auto">
      <Reorder.Group
        axis="x"
        values={pages}
        onReorder={setPages}
        className="flex flex-row gap-4 w-max"
      >
        {pages.map((item, idx) => (
            <Reorder.Item
              value={item}
              key={item}
              className="cursor-grab active:cursor-grabbing"
            >
              <Card className="w-64 min-w-[16rem]">
                <CardHeader>
                  <CardTitle>Item {idx + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.{item}
                </CardContent>
                {idx == 4 ? '' :(<p className="text-white bg-green-400 p-2">heheh</p>) }
              </Card>
            </Reorder.Item>
        ))}
      </Reorder.Group>
    </main>
  );
}