import { generateFlowGraph } from '@libs/game-tree';
import { useStore } from '@libs/store';
import { useCallback , useEffect, useState } from 'react'
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Edge, EdgeChange, Node, NodeChange } from 'react-flow-renderer'
import Board from './board';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 0, y: 0 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 0, y: 200 },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-3', source: '1', target: '3', animated: true },
]

const Flow = () => {
  const currentNode = useStore( state => state.getcurrentNode() )

  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodeClick = () => {
    const { nodes, edges } = generateFlowGraph(currentNode, [], [])
    setNodes(nodes)
    setEdges(edges)
  }

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  )

  return (
    <>
      <button onClick={onNodeClick}>Generate Flow</button>
      <ReactFlow
      nodes={nodes}
      edges={edges}
      // onClick={onNodeClick}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView />
    </>
  )
}

export default Flow
