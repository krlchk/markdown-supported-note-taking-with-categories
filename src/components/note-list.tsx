import { Link } from "react-router-dom";
import Creatable from "react-select";
import { Tag } from "../App";
import { useMemo, useState } from "react";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
};

export function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        title === "" ||
        (note.title.toLowerCase().includes(title) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => noteTag.id === tag.id),
            )))
      );
    });
  }, [notes, selectedTags, title]);

  return (
    <>
      <div className="xs:flex-col flex w-full justify-between font-kanit">
        <h1 className="xs:mb-5 text-4xl font-semibold">List</h1>
        <div className="xs:justify-between mobile:gap-5 flex gap-10">
          <Link className="xs:w-1/2" to="/new">
            <button className="mobile:text-lg xs:w-full mobile:px-4 rounded-md bg-[#2684FF] px-6 py-2 text-2xl text-white transition-colors hover:bg-[#2684FF]/80">
              Create
            </button>
          </Link>
          <button className="xs:w-1/2 mobile:text-lg mobile:px-4 rounded-md border border-[#ccc] px-6 py-2 text-2xl text-[#8b8b8b] transition-colors hover:bg-[#8b8b8b]/50 hover:text-white">
            Edit Tags
          </button>
        </div>
      </div>
      <form className="flex flex-col">
        <div className="mt-5 flex gap-5">
          <div className="flex w-1/2 flex-col">
            <label className="text-2xl font-medium" htmlFor="title">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            <Creatable
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
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
      </form>
      <div className="mobile:grid-cols-2 tablet:grid-cols-3 xs:grid-cols-1 grid grid-cols-4">
        {filteredNotes.map((note) => (
          <div className="mt-5 gap-3" key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
    </>
  );
}

export function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link to={`/${id}`}>
      <div className="xs:mb-2 mr-5 flex flex-col items-center justify-center rounded-md p-5 transition-transform hover:scale-105 hover:border hover:border-[#ccc]/60 hover:shadow-xl">
        <h1 className="text-xl font-semibold">{title}</h1>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 py-1">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="w-fit rounded-md border-[#2684FF] bg-[#2684FF] px-5 text-base font-semibold text-white"
              >
                {tag.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
