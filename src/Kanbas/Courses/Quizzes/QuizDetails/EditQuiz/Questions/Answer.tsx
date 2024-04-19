import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCheck, FaX } from "react-icons/fa6";
import {
  Answer as AnswerType,
  Answers,
  Question,
  QuestionType,
} from "../../../../../types";

function Answer({
  answer,
  editableQuestion,
  editableAnswers,
  setEditableAnswers,
}: {
  answer: AnswerType;
  editableQuestion: Question;
  editableAnswers: Answers;
  setEditableAnswers: (choices: Answers) => void;
}) {
  const [editableAnswer, setEditableAnswer] = useState(answer);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    setEditableAnswer(answer);
    setIsEditingTitle(answer.answer === "");
  }, [answer, editableAnswers]);

  const onEditToggle = () => {
    if (isEditingTitle) {
      const updatedAnswers = editableAnswers.map((a) =>
        a.answerId === editableAnswer.answerId ? editableAnswer : a,
      );
      setEditableAnswers(updatedAnswers);
    }
    setIsEditingTitle(!isEditingTitle);
  };

  const getCorrectStyle = () => {
    return {
      color: editableAnswer.isCorrect ? "darkgreen" : "#3d454c",
    };
  };

  const onDeleteAnswer = () => {
    setEditableAnswers(editableAnswers.filter((a) => a !== answer));
  };

  const onChangeIsCorrect = () => {
    const updatedAnswer = {
      ...editableAnswer,
      isCorrect: !editableAnswer.isCorrect,
    };
    setEditableAnswer(updatedAnswer);

    const updatedAnswers = editableAnswers.map((a) =>
      a.answerId === updatedAnswer.answerId ? updatedAnswer : a,
    );
    setEditableAnswers(updatedAnswers);
  };

  const isSaveDisabled = () => {
    return (
      isEditingTitle &&
      (editableAnswer.answer === "" ||
        editableAnswers.filter(
          (a) =>
            a.answerId !== editableAnswer.answerId &&
            a.answer === editableAnswer.answer,
        ).length > 0)
    );
  };

  return (
    <li key={answer.answerId} className="answer">
      <div className="answer-label">
        <span id="answerLabel" style={getCorrectStyle()}>
          {editableAnswer.isCorrect ? "Correct" : "Possible"} Answer:{" "}
        </span>
        {editableQuestion.type === QuestionType.MULTIPLE_CHOICE && (
          <div className="is-correct">
            <label htmlFor="isCorrect" style={getCorrectStyle()}>
              Is Correct?
            </label>
            <input
              type="checkbox"
              id="isCorrect"
              checked={editableAnswer.isCorrect}
              onChange={onChangeIsCorrect}
            />
          </div>
        )}
      </div>

      <input
        id="answerInput"
        type="text"
        placeholder="Answer"
        value={editableAnswer.answer}
        onChange={(e) =>
          setEditableAnswer({ ...editableAnswer, answer: e.target.value })
        }
        disabled={!isEditingTitle}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEditToggle();
        }}
      />

      <button
        type="button"
        id="editAnswerBtn"
        onClick={onEditToggle}
        style={getCorrectStyle()}
        disabled={isSaveDisabled()}
      >
        {isEditingTitle ? <FaCheck /> : <FaEdit />}
      </button>
      <button type="button" id="deleteAnswerBtn" onClick={onDeleteAnswer}>
        <FaX />
      </button>
    </li>
  );
}

export default Answer;
