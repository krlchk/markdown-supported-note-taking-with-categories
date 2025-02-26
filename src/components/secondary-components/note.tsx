import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../note-layout";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-4xl font-semibold">{note.title}</h1>
          {note.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-2 py-1">
              {note.tags.map((tag) => (
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
        <div className="mt-5 flex gap-10 self-end mobile:gap-5 xs:w-full">
          <Link to={`/${note.id}/edit`}>
            <button className="rounded-md bg-[#2684FF] px-6 py-2 text-2xl text-white transition-colors hover:bg-[#2684FF]/80 mobile:px-4 mobile:text-lg xs:w-1/2">
              Edit
            </button>
          </Link>
          <Link to="/">
            <button
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
              className="rounded-md border border-red-500 bg-white px-6 py-2 text-2xl text-red-500 transition-colors hover:bg-red-500 hover:text-white mobile:px-4 mobile:text-lg xs:w-1/2"
            >
              Delete
            </button>
          </Link>

          <Link className="xs:w-1/2" to="..">
            <button className="rounded-md border border-[#ccc] px-6 py-2 text-2xl text-[#8b8b8b] transition-colors hover:bg-[#8b8b8b]/50 hover:text-white mobile:px-4 mobile:text-lg xs:w-full">
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-5 text-xl">
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
