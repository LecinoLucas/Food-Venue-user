import React from 'react';
import CustomButton from './CustomButton';

const Modal = ({ isOpen, title, children, onSave, onCancel, labelButtonSave, labelButtonCancel, disabledButton = false }) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="grid place-items-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h2 className="text-lg leading-6 font-bold text-gray-900 mb-4">{title}</h2>
                        {children}
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {labelButtonSave && <CustomButton
                            color="primary"
                            type="button"
                            width='w-full'
                            disabled={disabledButton}
                            className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-secondary focus:outline-none sm:ml-3 sm:w-auto sm:text-sm ${disabledButton ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={onSave}
                        >
                            {labelButtonSave}
                        </CustomButton>}
                        {labelButtonCancel && <CustomButton
                            type="button"
                            color="white"
                            textColor='text-gray-700'
                            border='border border-gray-300'
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onCancel}
                        >
                            {labelButtonCancel}
                        </CustomButton>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
