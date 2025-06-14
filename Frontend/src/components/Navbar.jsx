import { Link } from "react-router-dom";

function Navbar () {
    return (
        <div className="nav-bar flex justify-between items-center bg-black text-white dark:bg-gray-950 dark:border-b-1 dark:border-b-gray-800">
            <ul className="nav-ulList flex gap-2">
                <Link to="/add"><li className="p-3 hover:bg-gray-800">Add Expense</li></Link>
                <Link to="/analysis"><li className="p-3 hover:bg-gray-800">Analysis</li></Link>
                <Link to="/details"><li className="p-3 hover:bg-gray-800">Expense Details</li></Link>
            </ul>
            <Link to="/"><p className="Logo mr-4">Epense-Tracker</p></Link>
        </div>
    )
}

export default Navbar;