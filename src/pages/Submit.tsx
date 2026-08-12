import { MdOutlineFileUpload } from "react-icons/md";
import { useSubmitPost, PostType } from "@/hooks/useSubmitPost";

export default function SubmitPage() {
  const {
    type,
    postTitle,
    setPostTitle,
    textBody,
    setTextBody,
    imageFile,
    setImageFile,
    linkUrl,
    setLinkUrl,
    error,
    isSubmitting,
    isDisabled,
    fileInputRef,
    handleTypeChange,
    handleSubmit,
  } = useSubmitPost();
  return (
    <div>
      <div className="max-w-3xl w-full flex flex-col justify-center items-center px-12 py-9">
        <div className="w-full">
          <h1 className="font-bold text-2xl py-3">Create a post</h1>
          <div className="relative flex w-full text-sm">
            <button
              onClick={() => {
                handleTypeChange(PostType.Text);
              }}
              className="w-full pb-1 pt-1 block rounded-sm hover:bg-gray-200/50 hover:cursor-pointer"
            >
              Text
            </button>
            <button
              onClick={async () => {
                handleTypeChange(PostType.Image);
              }}
              className="w-full pb-1 pt-1 block rounded-sm hover:bg-gray-200/50 hover:cursor-pointer"
            >
              Images & Video
            </button>
            <button
              onClick={async () => {
                handleTypeChange(PostType.Link);
              }}
              className="w-full pb-1 pt-1 block rounded-sm hover:bg-gray-200/50 hover:cursor-pointer"
            >
              Link
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center max-w-2xl"
          >
            <div className="pt-2 relative w-full">
              <input
                className="peer border border-gray-200 rounded-lg p-2 w-full "
                type="text"
                value={postTitle}
                required
                onChange={(e) => {
                  setPostTitle(e.target.value);
                }}
              />
              <label
                className="
                peer-focus:top-0
                peer-focus:text-[11px]

                peer-valid:top-0
                peer-valid:text-[11px] after:content-['*'] after:text-red-500 after:text-sm after:ml-2 absolute left-3 top-[60%] translate-y-[-60%] bg-transparent py-1.5 text-[#888] pointer-events-none duration-200 ease-in-out text-sm"
              >
                Title
              </label>
            </div>
            <div className="flex flex-col mt-4">
              {type === PostType.Text && (
                <textarea
                  className="peer resize-none rounded-lg w-full p-3 border-gray-200 border placeholder:text-sm "
                  name="body-text"
                  placeholder="Body Text"
                  id="body-text"
                  rows={10}
                  value={textBody}
                  onChange={(e) => {
                    setTextBody(e.target.value);
                  }}
                ></textarea>
              )}

              {type === PostType.Image && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative flex flex-col justify-center items-center sm:w-full min-h-64 border-dashed border-gray-200 border-2 rounded-lg hover:cursor-pointer"
                >
                  <span className="py-2">Drag and drop or upload media</span>
                  <MdOutlineFileUpload size={35} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  />
                </div>
              )}
              {type === PostType.Link && (
                <div className="pt-2 relative w-full">
                  <input
                    className="peer border border-gray-200 rounded-lg p-2 w-full "
                    type="text"
                    value={linkUrl}
                    required
                    onChange={(e) => {
                      setLinkUrl(e.target.value);
                    }}
                  />
                  <label
                    className="peer-focus:top-0
                peer-focus:text-[11px]

                peer-valid:top-0
                peer-valid:text-[11px] after:content-['*'] after:text-red-500 after:text-sm after:ml-2 absolute left-3 top-[60%] translate-y-[-60%] bg-transparent py-1.5 text-[#888] pointer-events-none duration-200 ease-in-out text-sm"
                  >
                    Link URL
                  </label>
                </div>
              )}
            </div>
            <div className="flex py-5 relative justify-center">
              {!isSubmitting ? (
                <input
                  type="submit"
                  value="Submit"
                  disabled={isDisabled}
                  className="bg-green-900 text-white py-2 px-4 rounded-full hover:cursor-pointer hover:brightness-85 w-25 text-center disabled:opacity-75 duration-200"
                />
              ) : (
                <div className="flex items-center justify-center h-10 opacity-75 rounded-full pointer-events-none w-25 py-2 px-4">
                  <div className="w-8 h-8 border-3 border-green-900 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
