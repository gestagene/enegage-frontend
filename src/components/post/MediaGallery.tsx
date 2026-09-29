export interface Media {
  id: number;
  media_url: string;
  media_type: string;
}

interface MediaGalleryProps {
  media: Media[];
}

export default function MediaGallery({ media }: MediaGalleryProps) {
  if (!media || media.length === 0) return null; // text-only post

  return (
    <div className="flex gap-2">
      {media.map((item) =>
        item.media_type.startsWith("image") ? (
          <img key={item.id} src={item.media_url} />
        ) : (
          <video key={item.id} src={item.media_url} controls />
        )
      )}
    </div>
  );
}
