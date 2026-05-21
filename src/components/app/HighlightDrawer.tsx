import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Highlighter, Trash2 } from "lucide-react";
import { readStorage, writeStorage, StorageKeys } from "@/lib/storage";

interface Highlight {
  id: string;
  text: string;
  createdAt: number;
}

type AllHighlights = Record<string, Highlight[]>;

interface Props {
  lessonId: string;
  open: boolean;
  onClose: () => void;
}

export function HighlightDrawer({ lessonId, open, onClose }: Props) {
  const [items, setItems] = useState<Highlight[]>([]);

  useEffect(() => {
    const all = readStorage<AllHighlights>(StorageKeys.highlights, {});
    setItems(all[lessonId] ?? []);
  }, [lessonId, open]);

  const remove = (id: string) => {
    const next = items.filter((h) => h.id !== id);
    setItems(next);
    const all = readStorage<AllHighlights>(StorageKeys.highlights, {});
    all[lessonId] = next;
    writeStorage(StorageKeys.highlights, all);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 w-[380px] bg-card border-l border-border z-50 flex flex-col"
          >
            <header className="p-6 border-b border-border flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Highlighter className="size-4 text-primary" />
                <div>
                  <h2 className="text-base font-bold">My highlights</h2>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">{items.length} saved</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-secondary rounded-md"><X className="size-4" /></button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {items.length === 0 ? (
                <div className="text-center pt-12">
                  <Highlighter className="size-6 mx-auto text-muted-foreground" />
                  <p className="text-sm font-medium mt-4">No highlights yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Select any text in the lesson and click the highlighter to save it.</p>
                </div>
              ) : (
                items.map((h) => (
                  <div key={h.id} className="p-3 bg-primary-soft/40 border border-primary/20 rounded-xl">
                    <p className="text-sm leading-relaxed">{h.text}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        {new Date(h.createdAt).toLocaleDateString()}
                      </span>
                      <button onClick={() => remove(h.id)} className="text-muted-foreground hover:text-destructive p-1">
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function addHighlight(lessonId: string, text: string) {
  const all = readStorage<AllHighlights>(StorageKeys.highlights, {});
  const entry: Highlight = { id: `${Date.now()}`, text, createdAt: Date.now() };
  all[lessonId] = [...(all[lessonId] ?? []), entry];
  writeStorage(StorageKeys.highlights, all);
}
