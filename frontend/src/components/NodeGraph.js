import React, { useState } from 'react'
import ReactFlow, {
    removeElements,
    addEdge,
    Background,
    Controls,
    ReactFlowProvider,
    ArrowHeadType,
} from 'react-flow-renderer'
import FloatingEdge from './../tools/FloatingEdge'
import FloatingConnectionLine from './../tools/FloatingConnectionLine'
import { createElements } from './../tools/utils'
import { Button, Modal } from '@themesberg/react-bootstrap'
import './../scss/NodeGraph.scss'

const initialElements = createElements()

const edgeTypes = {
    floating: FloatingEdge,
}

const NodeGraph = () => {
    const [elements, setElements] = useState(initialElements)
    const [isDraggable] = useState(false)
    const [zoomOnScroll] = useState(false)
    const [panOnScroll] = useState(false)
    const [paneMoveable] = useState(false)
    const [captureElementClick] = useState(true)
    const [showDefault, setShowDefault] = useState(false)
    const [currentNode, setCurrentNode] = useState(initialElements[0])
    const [rfInstance, setRfInstance] = useState(null)
    const handleClose = () => setShowDefault(false)

    const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els))

    const onLoad = (reactFlowInstance) => {
        setRfInstance(reactFlowInstance)
        reactFlowInstance.fitView()
    }

    // const download = (content, fileName, contentType) => {
    //     var a = document.createElement("a")
    //     var file = new Blob([content], { type: contentType })
    //     a.href = URL.createObjectURL(file)
    //     a.download = fileName
    //     a.click()
    // }

    const onConnect = (params) =>
        setElements((els) => addEdge({ ...params, type: 'floating', arrowHeadType: ArrowHeadType.Arrow }, els))

    const onElementClick = (event, element) => {
        // onSave()
        setCurrentNode(element)
        setShowDefault(true)
    }

    const onNodeDragStop = (event, node) => {
        console.log(node.position)
    }

    // const onSave = useCallback(() => {
    //     if (rfInstance) {
    //         const flow = rfInstance.toObject()
    //         var jsonData = JSON.stringify(flow)
    //         download(jsonData, 'json.txt', 'text/plain')
    //     }
    // }, [rfInstance])


    return (
        <div className="floatingedges">
            <ReactFlowProvider>
                <ReactFlow
                    elements={elements}
                    onElementsRemove={onElementsRemove}
                    onConnect={onConnect}
                    onLoad={onLoad}
                    edgeTypes={edgeTypes}
                    nodesDraggable={isDraggable}
                    panOnScroll={panOnScroll}
                    zoomOnScroll={zoomOnScroll}
                    paneMoveable={paneMoveable}
                    onElementClick={captureElementClick ? onElementClick : undefined}
                    onNodeDragStop={onNodeDragStop}
                    connectionLineComponent={FloatingConnectionLine}>
                    <Background />
                    <Controls
                        showZoom={false}
                        showInteractive={false}>
                    </Controls>
                </ReactFlow>
                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title className="h6">Detailed information on {currentNode.data.label}</Modal.Title>
                        <Button variant="close" aria-label="Close" onClick={handleClose} />
                    </Modal.Header>
                    <Modal.Body>
                        <p>Name: {currentNode.data.label}</p>
                        <p>Personality: {currentNode.data.mbti}</p>
                        <p>Twitter post count: {currentNode.data.tweets}</p>
                        <p>Influence Index: {currentNode.data.influenceIndex}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </ReactFlowProvider>
        </div>
    )
}

export default NodeGraph
