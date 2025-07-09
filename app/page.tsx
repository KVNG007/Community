'use client';

import { useState } from "react";
import { Reorder } from "framer-motion";
import {
  MdInfoOutline,
} from "react-icons/md";
import { TbFileDescription, TbTrash } from "react-icons/tb";
import { GoCheckCircle, GoCopy } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaFlag } from "react-icons/fa";
import { FiClipboard, FiEdit3 } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";

let nextId = 5;

const getPageIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "info":
      return <MdInfoOutline className="text-xl mr-2 text-yellow-500" />;
    case "details":
      return <TbFileDescription className="text-xl mr-2 text-gray-500" />;
    case "other":
      return <TbFileDescription className="text-xl mr-2 text-gray-500" />;
    case "ending":
      return <GoCheckCircle className="text-xl mr-2 text-gray-500" />;
    default:
      return <TbFileDescription className="text-xl mr-2 text-gray-500" />;
  }
};

export default function Home() {
  const [pages, setPages] = useState([
    { id: 1, name: "Info" },
    { id: 2, name: "Details" },
    { id: 3, name: "Other" },
    { id: 4, name: "Ending" },
  ]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(1);

  const insertPage = (index: number) => {
    const newPage = {
      id: nextId++,
      name: `Page ${nextId - 1}`,
    };
    const updated = [...pages];
    updated.splice(index + 1, 0, newPage);
    setPages(updated);
  };

  return (
    <main className="w-[100dvw] h-[100dvh] bg-primary p-10 overflow-x-auto flex flex-col gap-40">
      <div className="bg-white w-full p-10">
        <Reorder.Group
          axis="x"
          values={pages}
          onReorder={setPages}
          className="flex flex-row gap-3 w-max items-center"
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {pages.map((item, idx) => (
            <div key={item.id} className="flex flex-row items-center">
              <Reorder.Item value={item} className="cursor-grab active:cursor-grabbing">
                <button
                  onClick={() => setSelectedId(item.id)}
                  className={`relative z-10 flex items-center px-4 py-2 rounded-lg shadow-md transition cursor-pointer active:cursor-grabbing
                    ${selectedId === item.id
                      ? 'border border-gray-300 bg-white ring-1 ring-blue-400'
                      : 'bg-gray-100 border border-transparent hover:bg-gray-300'}
                    text-black
                  `}
                >
                  {getPageIcon(item.name)}
                  {item.name}
                </button>
              </Reorder.Item>

              {/* Add separator and + button between items */}
              {idx < pages.length - 1 && (
                <div
                  className="flex items-center -mx-1 relative z-[1]"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span className="text-gray-500 text-sm px-1 border-t-[1.5px] border-dashed border-gray-400 w-4 h-1/2"></span>
                  {hoveredIndex === idx && !isDragging && (
                    <button
                      onClick={() => insertPage(idx)}
                      className="mx-1 w-6 h-6 cursor-pointer rounded-full bg-secondary text-primary text-sm font-bold flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      +
                    </button>
                  )}
                  <span className="text-gray-500 text-sm px-1 border-t-[1.5px] border-dashed border-gray-400 w-4 h-1/2 ml-0.5 -mr-2"></span>
                </div>
              )}
            </div>
          ))}
        </Reorder.Group>
      </div>

      <section className="p-10 bg-white w-[40dvw] flex flex-col gap-5">
        {
          pages.map((item, idx) => (
            <DropdownMenu dir="ltr" key={idx} >
              <DropdownMenuTrigger className="w-max !outline-none">
                <button
                  // onClick={() => setSelectedId(item.id)}
                  className={`relative z-10 flex items-center px-4 py-2 rounded-lg shadow-md transition cursor-pointer active:cursor-grabbing
                    ${false
                      ? 'border border-gray-300 bg-white ring-1 ring-blue-400'
                      : 'bg-gray-100 border border-transparent hover:bg-gray-300'}
                    text-black
                  `}
                >
                  {getPageIcon(item.name)}
                  {item.name}
                </button>

              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" alignOffset={100} className="-translate-y-[100%] translate-x-[20%] min-w-[200px] font-medium">
                <DropdownMenuLabel className="text-base ">Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-row items-center gap-2">
                  <FaFlag color="#2f73e2" />
                  Set as first page
                </DropdownMenuItem>

                <DropdownMenuItem className="flex flex-row items-center gap-2">
                  <FiEdit3 color="#9DA4B2" />
                  Rename
                </DropdownMenuItem>

                <DropdownMenuItem className="flex flex-row items-center gap-2">
                  <FiClipboard color="#9DA4B2" />
                  Copy
                </DropdownMenuItem>

                <DropdownMenuItem className="flex flex-row items-center gap-2">
                  <HiOutlineDuplicate color="#9DA4B2" />
                  Duplicate
                </DropdownMenuItem>

                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuItem className="flex flex-row items-center gap-2">
                  <TbTrash color="#ee484f" />
                  Delete
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          ))
        }
      </section>

    </main>
  );
}
