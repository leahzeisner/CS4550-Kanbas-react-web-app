import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ComingUpItem } from "../../../types";

interface ComingUpListItemProps {
  item: ComingUpItem;
  index: number;
}

const ComingUpListItem = ({ item, index }: ComingUpListItemProps) => {
  return (
    <div className="coming-up-item" key={`${item.title}-${index}`}>
      <FaCalendar className="coming-up-icon"></FaCalendar>
      <div className="coming-up-item-info">
        <Link to="#" className="coming-up-item-title">
          {item.title}
        </Link>
        <span className="coming-up-item-section">{item.section}</span>
        <span className="coming-up-item-date">{item.date}</span>
      </div>
    </div>
  );
};

export default ComingUpListItem;
