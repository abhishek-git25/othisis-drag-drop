import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useRef, useState } from 'react';
import { FiShare } from "react-icons/fi";
import { IoMdMic, IoMdSearch } from "react-icons/io";
import { MdDeleteOutline, MdInfoOutline, MdOutlineEdit } from "react-icons/md";

const templateItems = [
    'Subjective',
    'Objective',
    'Assessment',
    'Findings',
    'Diagnoses',
    'Treatment',
    'Recovery',
    'Chief Complaint',
    'History of Present Illness',
    'Medical History',
    'Surgical History',
    'Family History',
    'Social History',
    'Medications',
    'Allergies',
    'Physical Examination',
    'Investigations',
    'Differential Diagnoses',
    'Plan',
    'Follow-up Instructions',
    'Discharge Summary',
    'Progress Notes',
    'Vitals',
    'Lab Results',
    'Radiology Findings',
    'Referral Notes'
];


export default function DragDropEditor() {
    const [usedTemplates, setUsedTemplates] = useState([]);
    const [activeItem, setActiveItem] = useState(null);
    const [showOverlayDrop, setShowOverlayDrop] = useState(false);
    const [activeDropZone, setActiveDropZone] = useState(null);
    const overlayContentRef = useRef(null);


    useEffect(() => {
        if (overlayContentRef.current && showOverlayDrop) {
            overlayContentRef.current.scrollTo({
                top: overlayContentRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [showOverlayDrop]);

    const handleDragStart = (event) => {
        const { active } = event;

        console.log(event, "18");

        setActiveItem(active.id);
        setShowOverlayDrop(true);
    };

    const handleDragEnd = ({ over, active }) => {
        setShowOverlayDrop(false);

        if (!over) return;

        if (
            (over.id === 'dropzone' || over.id === 'overlay-drop') &&
            !usedTemplates.includes(active.id)
        ) {
            setUsedTemplates(prev => [...prev, active.id]);
        }

        if (over.id === 'templatezone') {
            setUsedTemplates(prev => prev.filter(item => item !== active.id));
        }

        setActiveItem(null);
    };

    const leftItems = templateItems.filter(item => !usedTemplates.includes(item));

    return (
        <DndContext
            // collisionDetection={axisAl}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={({ over }) => {
                setActiveDropZone(over?.id || null);
            }}
        >
            <div className="flex gap-4 h-[calc(100vh-10rem)] relative">
                {/* Left Panel */}
                <Droppable id="templatezone">
                    <div className="w-70 flex-1 flex flex-col bg-gray-200 rounded-xl shadow-lg h-full overflow-y-auto">
                        <div className='p-4 w-full flex-1 flex flex-col'>
                            <h2 className="text-3xl font-semibold text-center mb-3">Template</h2>
                            <div className='bg-white flex-1 flex flex-col gap-2 p-3 rounded-lg h-full '>
                                <div className="relative w-full mb-3">
                                    <input
                                        type="text"
                                        className="bg-gray-100 p-2 pr-10 rounded-lg text-sm placeholder:text-sm w-full"
                                        placeholder="Search Template"
                                    />
                                    <IoMdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                </div>
                                {!activeItem && leftItems.map((item) => (
                                    <DraggableItem
                                        key={item}
                                        id={item}
                                        heading={item}
                                        onDragStart={() => setActiveItem(item)}
                                        styles="p-1 bg-gray-100 rounded cursor-grab mb-2 text-center text-sm w-full"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='bg-black text-white rounded-sm p-4 w-70 flex gap-2 justify-center items-center absolute bottom-0 left-0 right-0'>
                            Edit <MdOutlineEdit />
                        </div>
                    </div>
                </Droppable>

                {/* Right Panel */}
                <div className="flex-1 bg-gray-200 shadow-lg rounded-lg px-8 pt-5 flex flex-col">
                    <div className='w-full flex justify-between items-center mb-4'>
                        <h2 className="text-3xl font-semibold mb-2 flex items-center gap-2">
                            Root Canal <MdInfoOutline fontSize={"1.7rem"} />
                        </h2>
                        <div className='flex gap-2 items-center'>
                            <button className="flex bg-white items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl">
                                <IoMdMic /> <span className="text-sm font-medium">Resume</span>
                            </button>
                            <FiShare fontSize={25} />
                            <MdDeleteOutline fontSize={25} className='text-[#B00020]' />
                        </div>
                    </div>
                    <div className='bg-white flex-1 flex flex-col gap-2 px-3 pt-3 rounded-t-lg h-full overflow-y-auto'>
                        <Droppable id="dropzone">
                            {!activeItem && usedTemplates.map((item) => (
                                <DraggableItem
                                    key={item}
                                    id={item}
                                    heading={`${item}`}
                                    subheading="Toothache for few days"
                                    onDragStart={() => setActiveItem(item)}
                                    styles="p-2 bg-gray-200 rounded cursor-grab mb-2 text-sm"
                                />
                            ))}
                        </Droppable>
                    </div>
                </div>
            </div>

            {/* Drag Overlay Backdrop */}
            {showOverlayDrop && (
                <div className="fixed inset-0  bg-black/70 backdrop-blur-sm z-30 flex justify-center items-center">
                    <Droppable id="overlay-drop">
                        <div ref={overlayContentRef} className="bg-transparent border-2 border-dashed border-white rounded-xl shadow-xl w-[400px] min-h-[6vh] max-h-[80vh] overflow-auto p-4 flex flex-col gap-2 text-gray-700 text-sm font-medium">
                            {usedTemplates.length === 0 && (
                                <div className="text-gray-400 text-center">Drop here to add</div>
                            )}
                            {usedTemplates.map((item) => (
                                <div
                                    key={item}
                                    className="bg-[#EDEDED] p-2 rounded  "
                                >
                                    {item}
                                    <p className="text-gray-600 text-xs">
                                        <span className='pr-2'>•</span>
                                        Toothache for few days
                                    </p>
                                </div>
                            ))}

                            {activeItem && activeDropZone === 'overlay-drop' && (
                                <div className="border-2 border-dashed border-gray-400 p-4 rounded bg-gray-100 text-center text-gray-500 text-sm">
                                    Drop to add "{activeItem}"
                                </div>
                            )}

                        </div>
                    </Droppable>
                </div>
            )}

            {/* DragOverlay from dnd-kit */}
            <DragOverlay>
                {activeItem ? (
                    <DraggableItem
                        id={activeItem}
                        heading={activeItem}
                        disableListeners={true}
                        styles="w-3/10  p-1 bg-gray-100 rounded cursor-grab mb-2 text-center text-sm w-full"
                    />
                ) : null}
            </DragOverlay>

        </DndContext>
    );
}

function DraggableItem({ id, heading, styles, onDragStart, subheading, disableListeners }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const eventProps = disableListeners ? {} : { ...attributes, ...listeners };


    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            {...eventProps}
            onMouseDown={() => onDragStart?.()}
            className={styles}
        >
            <h3 className="font-medium text-sm mb-1">{heading}</h3>
            {subheading && (
                <p className="text-gray-600 text-xs">
                    <span className='pr-2'>•</span>
                    {subheading}
                </p>
            )}
        </div>
    );
}

function Droppable({ id, children }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="min-h-[4rem] p-2">
            {children}
        </div>
    );
}
