import React from "react";
import { useState } from "react";
import "./List.css";
import TodoItem from "./TodoItem.jsx";
import { useMemo } from "react";

function List({ todos, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");

  const getFilterData = () => {
    if (search === "") return todos;

    const searchedTodos = todos.filter((todo) => {
      return todo.content.toLowerCase().includes(search.toLowerCase());
    });

    return searchedTodos;
  };

  //리렌더링 될 때 마다 호출
  const filterTodos = getFilterData();

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log("getAnalyzedData call");

    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return { totalCount, doneCount, notDoneCount };
  }, [todos]);

  return (
    <div className="List">
      <h4>Todo List</h4>
      <div>
        <div>total : {totalCount}</div>
        <div>doneCount : {doneCount}</div>
        <div>notDoneCount : {notDoneCount}</div>
      </div>
      <input
        placeholder="검색어를 입력해주세요."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        //리렌더링 될 때 마다 filterTodos 호출
      />

      <div className="todo_wrapper">
        {filterTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default List;
