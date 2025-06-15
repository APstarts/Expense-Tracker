function Dialog(props) {
    const {onClick, displayText} = props;
    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl text-center relative z-50">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">{displayText}</h2>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={onClick}>Close</button>
          </div>
        </div>)
}

export default Dialog;