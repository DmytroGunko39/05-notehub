import css from "./App.module.css";
import NoteList from "../NoteList/NoteList.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm.tsx";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService.ts";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [searchTopic, setSearchTopic] = useState("");

  const updateSearchTopic = useDebouncedCallback(
    (newSearchTopic: string) => setSearchTopic(newSearchTopic),
    500
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", searchTopic, currentPage],
    queryFn: () => fetchNotes(currentPage, perPage, searchTopic),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load notes.</p>;

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTopic} onSearch={updateSearchTopic} />
        {totalPages > 1 && (
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && !isLoading && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCloseModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
