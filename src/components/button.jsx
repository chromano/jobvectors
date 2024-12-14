const Button = ({ children, onClick }) => (
    <button
        className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 font-semibold text-purple-800 shadow-sm hover:bg-purple-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        onClick={onClick}>
        {children}
    </button>
);

const SecondaryButton = ({ children, onClick }) => (
    <button
        className="inline-flex items-center gap-x-1.5 rounded-md bg-purple-800 px-2 py-1 font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        onClick={onClick}>
        {children}
    </button>
);

export { Button, SecondaryButton };