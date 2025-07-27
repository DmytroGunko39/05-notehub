import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNotesData, NoteTag } from "../../types/note";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";

interface NoteFormProps {
  onCloseModal: () => void;
}

interface FormValue {
  title: string;
  content: string;
  tag: NoteTag;
}

const formValue: FormValue = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

export default function NoteForm({ onCloseModal }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (noteData: NewNotesData) => createNote(noteData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      onCloseModal();
    },
  });

  const handleSubmit = (
    values: FormValue,
    formikHelpers: FormikHelpers<FormValue>
  ) => {
    mutation.mutate(values, {
      onSuccess: () => {
        formikHelpers.resetForm();
        onCloseModal();
      },
    });
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={formValue}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          ></Field>
          <ErrorMessage name="content">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>

          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag">
            {(msg) => <span className={css.error}>{msg}</span>}
          </ErrorMessage>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onCloseModal}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
