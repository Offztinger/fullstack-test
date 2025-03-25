import React from "react";
import KanbanColumn from "./KanbanColumn";

const STATUSES = ["PENDING", "IN_PROGRESS", "COMPLETED"];

const KanbanBoard = ({ tasks }) => {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {STATUSES.map((status) => (
        <KanbanColumn key={status} status={status} tasks={tasks[status]} />
      ))}
    </div>
  );
};

export default KanbanBoard;