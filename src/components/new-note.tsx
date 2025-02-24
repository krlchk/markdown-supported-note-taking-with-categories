import { NoteData } from "../App";
import { NoteForm } from "./secondary-components";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
};
export function NewNote({ onSubmit }: NewNoteProps) {
  return (
    <>
      <h1 className="font-kanit text-4xl font-semibold">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  );
}
