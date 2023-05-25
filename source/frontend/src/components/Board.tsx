import { useState } from "react";

import type { FC } from "react";
import { Input, Button, Select, Modal } from 'antd';

import type { BoardCardItemType } from "@app/types/model/board";

import BoardColumn from "./BoardColumn";

import "../style/Board.css";
import CandidateCreate from "src/pages/CandidateCreate";

const { Search } = Input;

interface BoardProps {
    columns: Array<{
        name: string;
        totalItemsNumber: number;
        displayedItemsNumber: number;
        items: Array<BoardCardItemType>;
    }>;
}

const Board: FC<BoardProps> = ({ columns }) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const handleSearch = (e: any) => {
        setSearch((e.target.value))
    }

    const handleAdd = () => {
        setOpen(true);
    }

    const handleCreate = () => {

    }
    
    const handleClose = () => setOpen(false);

    return (
        <div className="boxAndRadius">
            <div className="board-header">
                <div className="board-header-search-filters">
                    <Search
                        className="board-component-search"
                        placeholder="Поиск..."
                        onInput={handleSearch}
                        style={{ width: 200 }}
                    />
                    <Filters />
                </div>
                <Button onClick={handleAdd} type="primary">Добавить</Button>
            </div>

            <div className="board-component">
                {columns.map(e => (
                    <BoardColumn
                        search={search}
                        key={e.name}
                        items={e.items}
                        name={e.name}
                        total={e.totalItemsNumber}
                        current={e.displayedItemsNumber}
                    />
                ))}
            </div>
            <Modal title="Добавление кандидата" open={open} onOk={handleCreate} onCancel={handleClose} width={700}>
                <CandidateCreate />
            </Modal>
        </div>
    );
}

interface FiltersProps {

}

const Filters: React.FC<FiltersProps> = () => {

    const departmentOptions = [
        { value: '', label: 'Департамент' },
        { value: 'development', label: 'Разработка' },
        { value: 'support', label: 'Поддержка' },
        { value: 'managment', label: 'Менеджмент' }
    ];

    const vacanciesOptions = [
        { value: '', label: 'Вакансия' },
        { value: 'junior', label: 'Джун' },
        { value: 'middle', label: 'Мидл' },
        { value: 'senior', label: 'Помидор' }
    ];

    return (
        <>
            <Select
                defaultValue=""
                style={{ width: 140 }}
                onChange={() => { }}
                options={departmentOptions}
            />
            <Select
                defaultValue=""
                style={{ width: 120 }}
                onChange={() => { }}
                options={vacanciesOptions}
            />
        </>
    );
}

export default Board;
