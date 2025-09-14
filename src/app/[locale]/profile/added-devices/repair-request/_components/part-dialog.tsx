import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { ImagesCarousel } from "./image-carousel";

export function PartDialog({ children, images }: { children: React.ReactNode; images: string[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex w-full justify-center bg-white">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only" />
          <DialogDescription className="sr-only" />
        </DialogHeader>

        {images.length > 0 ? (
          <ImagesCarousel images={images} />
        ) : (
          <div className="flex h-44 items-center justify-center">
            There is no Images for this part
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
