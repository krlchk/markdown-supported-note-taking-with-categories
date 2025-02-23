import CreatableReactSelect from "react-select";

export function NoteForm() {
  return (
    <div className="font-kanit">
      <form className="flex flex-col">
        <div className="mt-5 flex gap-5">
          <div className="flex w-1/2 flex-col">
            <label className="text-2xl font-medium" htmlFor="title">
              Title
            </label>
            <input
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
            <CreatableReactSelect className="mt-2" name="tags" isMulti />
          </div>
        </div>
        <div className="mt-5 flex w-full flex-col">
          <label className="text-2xl font-medium" htmlFor="body">
            Body
          </label>
          <textarea
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
          <button
            type="button"
            className="rounded-md border border-[#ccc] px-6 py-2 text-2xl text-[#8b8b8b] transition-colors hover:bg-[#8b8b8b]/30"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
