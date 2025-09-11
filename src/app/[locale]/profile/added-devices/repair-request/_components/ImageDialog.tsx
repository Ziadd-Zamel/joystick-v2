/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ImagesCarousel } from "./ImageCarousel";

export function PartDialog({ children, images}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="w-full flex justify-center">
        <DialogTitle></DialogTitle>
          {images.length > 0 ? (
            <ImagesCarousel images={images} />
          ) : (
            <div className="h-44 flex justify-center items-center">
              لا يوجد صور متاحة لهذا الجزء
            </div>  
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
}
