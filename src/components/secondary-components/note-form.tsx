import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select";
import { NoteData, Tag } from "../../App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export function NoteForm({ onSubmit }: NoteFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: inputRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
  };
  return (
    <div className="font-kanit">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mt-5 flex gap-5">
          <div className="flex w-1/2 flex-col">
            <label className="text-2xl font-medium" htmlFor="title">
              Title
            </label>
            <input
              required
              ref={inputRef}
              placeholder="Title..."
              className="mt-2 h-full rounded-[4px] border border-[#ccc] px-2 placeholder:text-[#8b8b8b]"
              name="title"
              type="text"
            />
          </div>
          <div className="flex w-1/2 flex-col">
            <label className="text-2xl font-medium" htmlFor="tags">
              Tags
            </label>
            <CreatableReactSelect
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
              value={selectedTags.map((tag) => {
                return {
                  label: tag.label,
                  value: tag.id,
                };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return {
                      label: tag.label,
                      id: tag.value,
                    };
                  }),
                );
              }}
              className="mt-2"
              name="tags"
              isMulti
            />
          </div>
        </div>
        <div className="mt-5 flex w-full flex-col">
          <label className="text-2xl font-medium" htmlFor="body">
            Body
          </label>
          <textarea
            required
            ref={markdownRef}
            className="mt-2 rounded-[4px] border border-[#ccc] p-3 px-2 placeholder:text-[#8b8b8b]"
            name="body"
            rows={15}
          />
        </div>
        <div className="mt-5 flex gap-10 self-end">
          <button
            type="submit"
            className="rounded-md bg-[#2684FF] px-6 py-2 text-2xl text-white transition-colors hover:bg-[#2684FF]/80"
          >
            Save
          </button>
          <Link to="..">
            <button
              type="button"
              className="rounded-md border border-[#ccc] px-6 py-2 text-2xl text-[#8b8b8b] transition-colors hover:bg-[#8b8b8b]/30"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
