import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { RichTextEditor, Link } from "@/components/editor";
import { ImageIcon } from "lucide-react";
import { useMemo, useRef } from "react";
import SubmitImageOverlay from "@/components/ui/SubmitImageOverlay";
import { useSubmitPost } from "@/hooks/useSubmitPost";
import "@/components/editor/style.css";

export default function Submit() {
  const extensions = useMemo(
    () => [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Placeholder.configure({ placeholder: "Body Text" }),
    ],
    [],
  );
  const editor = useEditor({ shouldRerenderOnTransaction: false, extensions });

  const {
    imageFiles,
    previewUrls,
    handleFileSelect,
    removeImage,
    title,
    setTitle,
    isSubmitting,
    handleSubmit,
  } = useSubmitPost(editor);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-4 p-4 sm:px-6 min-w-0 min-h-0 max-w-200 shadow-sm rounded-sm"
    >
      <div className="text-2xl font-bold">Create a post</div>
      <div className="pt-2 relative w-full">
        <input
          className="focus:outline-0 peer p-2 w-full"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="peer-focus:top-0 peer-focus:text-[11px] peer-valid:top-0 peer-valid:text-[11px] after:content-['*'] after:text-red-500 after:text-sm after:ml-2 absolute left-3 top-[60%] translate-y-[-60%] bg-transparent py-1.5 text-[#888] pointer-events-none duration-200 ease-in-out text-lg">
          Title
        </label>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        accept="image/*,video/*"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length === 0) return;
          handleFileSelect(files);
        }}
      />

      <div className="relative flex flex-col my-custom-editor min-w-0 ">
        <RichTextEditor variant="subtle" editor={editor}>
          {imageFiles.length > 0 && (
            <div className={`relative w-full h-96 px-4 overflow-hidden`}>
              <SubmitImageOverlay />
              {previewUrls.map((url, i) => (
                <div
                  key={i}
                  className="absolute inset-0 w-full h-full transition-opacity duration-200 "
                >
                  <img
                    src={url}
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-75"
                  />
                  <img
                    src={url}
                    alt="preview img"
                    className="relative w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    aria-label="Remove image"
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  ></button>
                </div>
              ))}
            </div>
          )}

          <RichTextEditor.Content />
          <RichTextEditor.Toolbar>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Control
                aria-label="Insert image"
                title="Insert image"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon size={16} />
              </RichTextEditor.Control>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.Code />
              <RichTextEditor.ClearFormatting />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>
        </RichTextEditor>
      </div>
      <div className="flex justify-center">
        <button
          className={`flex justify-center items-center max-h-11 max-w-1/2  bg-green-900 text-white py-2 px-4 rounded-full hover:cursor-pointer hover:brightness-85  text-center disabled:opacity-75 duration-200 ${isSubmitting && "opacity-75"}`}
          type="submit"
          disabled={title.length < 3}
        >
          {isSubmitting ? (
            <div className="flex justify-center opacity-75 rounded-full pointer-events-none w-25 py-4 px-4">
              <div className="w-7 h-7 border-3 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
}
