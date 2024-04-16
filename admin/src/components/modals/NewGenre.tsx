import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { useNewGenreModal } from "@/hooks/modals/use-new-genre";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { newGenreSchema } from "@/schemas/data-schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import dataService from "@/services/data.service";

import { SEO } from "../SEO";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { TCustomError } from "@/utils/types";

type TNewGenreProps = {};

export const NewGenre = ({}: TNewGenreProps) => {
  const newGenreModal = useNewGenreModal();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof newGenreSchema>>({
    resolver: zodResolver(newGenreSchema),
    defaultValues: {
      name: "",
    },
  });

  const newGenreMutation = useMutation({
    mutationKey: ["New Genre"],
    mutationFn: dataService.createGenre,
    onSuccess: () => {
      toast.success("New Genre Added.");
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      form.reset();
      newGenreModal.onClose();
    },
    onError: (e: TCustomError) => toast.error(e.response.data.message),
  });

  const onSubmit = (values: z.infer<typeof newGenreSchema>) =>
    newGenreMutation.mutate(values);

  return (
    <>
      <SEO title="HDMovie-NewGenre" />
      <Dialog
        open={newGenreModal.open}
        onOpenChange={() => {
          form.reset();
          newGenreModal.onClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Genre</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>* Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={newGenreMutation.isPending}
                className="w-full"
              >
                {newGenreMutation.isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
