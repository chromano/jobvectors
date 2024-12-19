export default function Loading({ hideLabel = false }: { hideLabel?: boolean }) {
    return (
        <div
            className={
                "z-50 fixed top-2 left-1/2 bg-purple-800/75 text-white " +
                (hideLabel ? "rounded-full" : "rounded")
            }>
            <button
                type="button"
                className="mx-auto rounded flex flex-row font-semibold p-1"
                disabled>
                <svg
                    className={
                        "animate-spin h-5 w-5 text-white" +
                        (hideLabel ? " mr-0 mt-0" : "mr-3 mt-0.5")
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>{" "}
                {!hideLabel ? <span className="ml-2">Loading...</span> : null}
            </button>
        </div>
    );
}
