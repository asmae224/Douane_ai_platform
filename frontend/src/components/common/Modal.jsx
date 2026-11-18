const Modal = ({
    isOpen,
    onClose,
    title,
    children,
}) => {

    if (!isOpen) return null;

    return (

        <div
            className="
                fixed
                inset-0

                z-50

                flex
                items-center
                justify-center

                bg-black/40

                backdrop-blur-sm
            "
        >

            <div
                className="
                    bg-white

                    rounded-2xl

                    shadow-2xl

                    w-full
                    max-w-2xl

                    mx-4

                    overflow-hidden

                    animate-in
                "
            >

                {/* ================= Header ================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-between

                        px-6
                        py-5

                        border-b
                    "
                >

                    <h2
                        className="
                            text-xl
                            font-semibold
                            text-slate-800
                        "
                    >

                        {title}

                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            w-9
                            h-9

                            rounded-lg

                            text-slate-500

                            hover:bg-slate-100

                            transition
                        "
                    >

                        ✕

                    </button>

                </div>

                {/* ================= Body ================= */}

                <div
                    className="
                        p-6
                    "
                >

                    {children}

                </div>

            </div>

        </div>

    );

};

export default Modal;