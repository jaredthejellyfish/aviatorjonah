import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCourse } from "@/actions/createCourse";

export function CreateCourseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Enter the title of your new course to get started.
          </DialogDescription>
        </DialogHeader>
        <form action={createCourse}>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col items-start gap-y-2">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" name="title" required />
            </div>

            <div className="flex flex-col items-start gap-y-2">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" name="description" />
            </div>

            <div className="flex flex-col items-start gap-y-2">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue="0"
              />
            </div>

            <div className="flex flex-col items-start gap-y-2">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select name="category">
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-start gap-y-2">
              <Label htmlFor="level" className="text-right">
                Level
              </Label>
              <Select name="level">
                <SelectTrigger>
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Create Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}