import { useRef, useState } from "react";

import Modal from "../common/Modal";
import Button from "../common/Button";

const UploadDocumentModal = ({
    isOpen,
    onClose,
    onUpload,
    loading = false,
}) => {

    const inputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleChooseFile = () => {
        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = () => {

        if (!selectedFile) return;

        onUpload(selectedFile);

    };

    const handleClose = () => {

        setSelectedFile(null);

        onClose();

    };

    return (

        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Importer un document"
        >

            <div className="space-y-6">

                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                />

                <div className="space-y-3">

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleChooseFile}
                    >
                        Choisir un fichier
                    </Button>

                    {selectedFile && (

                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

                            <p className="font-medium text-slate-700">

                                {selectedFile.name}

                            </p>

                            <p className="text-sm text-slate-500">

                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB

                            </p>

                        </div>

                    )}

                </div>

                <div className="flex justify-end gap-3">

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Annuler
                    </Button>

                    <Button
                        type="button"
                        onClick={handleUpload}
                        disabled={!selectedFile || loading}
                    >
                        {loading ? "Importation..." : "Importer"}
                    </Button>

                </div>

            </div>

        </Modal>

    );

};

export default UploadDocumentModal;