import { Link } from "react-router-dom";
import Creatable from "react-select";
import { Tag } from "../App";
import { useMemo, useState } from "react";
import clsx from "clsx";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

export function NoteList({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      <div className="flex w-full justify-between font-kanit xs:flex-col">
        <h1 className="text-4xl font-semibold xs:mb-5">Notes</h1>
        <div className="flex gap-10 mobile:gap-5 xs:justify-between">
          <Link className="xs:w-1/2" to="/new">
            <button className="rounded-md bg-[#2684FF] px-6 py-2 text-2xl text-white transition-colors hover:bg-[#2684FF]/80 mobile:px-4 mobile:text-lg xs:w-full">
              Create
            </button>
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-md border border-[#ccc] px-6 py-2 text-2xl text-[#8b8b8b] transition-colors hover:bg-[#8b8b8b]/50 hover:text-white mobile:px-4 mobile:text-lg xs:w-1/2"
          >
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
      <div className="grid grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-2 xs:grid-cols-1">
        {filteredNotes.map((note) => (
          <div className="mt-5 gap-3" key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
      <EditTagsModal
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        availableTags={availableTags}
      />
    </>
  );
}

export function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link to={`/${id}`}>
      <div className="mr-5 flex flex-col items-center justify-center rounded-md p-5 transition-transform hover:scale-105 hover:border hover:border-[#ccc]/60 hover:shadow-xl xs:mb-2">
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

export function EditTagsModal({
  availableTags,
  show,
  handleClose,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <div
      onClick={handleClose}
      className={clsx(
        show
          ? "absolute inset-0 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm"
          : "hidden",
      )}
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
        className="flex h-auto min-h-[50vh] w-[70vh] flex-col rounded-lg bg-white p-10"
      >
        <div className="flex justify-between">
          <h1 className="flex items-center text-2xl">Edit tags</h1>
          <button
            onClick={handleClose}
            className="text-3xl text-[#8b8b8b] transition-colors hover:text-[#8b8b8b]/70"
          >
            X
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          {availableTags.map((tag) => (
            <div
              className="flex items-center justify-between rounded-lg border border-[#ccc] p-2"
              key={tag.id}
            >
              <input
                onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                className="h-full w-full focus:outline-none"
                type="text"
                value={tag.label}
              />
              <button
                onClick={() => onDeleteTag(tag.id)}
                className="aspect-ratio h-10 w-10 rounded-md border-2 border-red-500 font-semibold text-red-500 transition-colors hover:bg-red-500 hover:text-white"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
