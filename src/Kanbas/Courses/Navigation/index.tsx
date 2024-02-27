import { Link, useLocation } from "react-router-dom";
import "./index.css";
import "../../styles.css";
import { courseNavLinks } from "../../constants";
import { Course } from "../../types";

function CourseNavigation({ course }: { course: Course | undefined }) {
  const { pathname } = useLocation();

  return (
    <div className="sticky-second-nav d-none d-lg-block" id="sticky-course-nav">
      <ul className="wd-navigation">
        {courseNavLinks.map((link, index) => (
          <li
            key={index}
            className={
              pathname.includes(link.label.replace(/\s/g, ""))
                ? "wd-active"
                : ""
            }
          >
            <Link
              to={`/Kanbas/Courses/${course ? course._id + "/" : ""}${link.label.replace(/\s/g, "")}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CourseNavigation;
