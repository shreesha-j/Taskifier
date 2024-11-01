/**
 * Trello component to display and manage a board's sections and tasks.
 * This component uses react-beautiful-dnd to drag and drop sections and tasks.
 * It also uses the react-beautiful-dnd onDragEnd event to update the position of tasks and sections.
 * @param {object} props - The props passed to the component.
 * @param {string} props.boardId - The ID of the board to display and manage.
 * @param {array} props.data - The data of the board's sections and tasks.
 */
const Trello = ({ boardId, data }) => {
  const [selectedTask, setSelectedTask] = useState(undefined)
  const [sections, setSections] = useState(data)

  useEffect(() => {
    setSections(data)
  }, [data])

  /**
   * Handle the drag and drop event for sections and tasks.
   * @param {object} result - The result of the drag and drop event.
   */
  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return
    const sourceColIndex = sections.findIndex(e => e.id === source.droppableId)
    const destinationColIndex = sections.findIndex(e => e.id === destination.droppableId)
    const sourceCol = sections[sourceColIndex]
    const destinationCol = sections[destinationColIndex]

    const sourceSectionId = sourceCol.id
    const destinationSectionId = destinationCol.id

    const sourceTasks = [...sourceCol.tasks]
    const destinationTasks = [...destinationCol.tasks]

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1)
      destinationTasks.splice(destination.index, 0, removed)
      sections[sourceColIndex].tasks = sourceTasks
      sections[destinationColIndex].tasks = destinationTasks
    } else {
      const [removed] = destinationTasks.splice(source.index, 1)
      destinationTasks.splice(destination.index, 0, removed)
      sections[destinationColIndex].tasks = destinationTasks
    }

    try {
      await taskApi.updatePosition(boardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId
      })
      setSections(sections)
    } catch (err) {
      alert(err)
    }
  }

  /**
   * Handle the event when the user clicks on a task to open the task modal.
   * @param {object} task - The task to open the modal for.
   */
  const openTaskModal = (task) => {
    setSelectedTask(task)
  }

  /**
   * Handle the event when the user closes the task modal.
   */
  const closeTaskModal = () => {
    setSelectedTask(undefined)
  }

  /**
   * Handle the event when the user updates a task.
   * @param {object} task - The task to update.
   */
  const updateTask = async (task) => {
    const newData = [...sections]
    const sectionIndex = newData.findIndex(e => e.id === task.section.id)
    const taskIndex = newData[sectionIndex].tasks.findIndex(e => e.id === task.id)
    newData[sectionIndex].tasks[taskIndex] = task
    setSections(newData)
  }

  /**
   * Handle the event when the user deletes a task.
   * @param {object} task - The task to delete.
   */
  const deleteTask = (task) => {
    const newData = [...sections]
    const sectionIndex = newData.findIndex(e => e.id === task.section.id)
    const taskIndex = newData[sectionIndex].tasks.findIndex(e => e.id === task.id)
    newData[sectionIndex].tasks.splice(taskIndex, 1)
    setSections(newData)
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button onClick={() => createSection(boardId)}>
          Add section
        </Button>
        <Typography variant='body2' fontWeight='700'>
          {sections.length} Sections
        </Typography>
      </Box>
      <Divider sx={{ margin: '10px 0' }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          width: 'calc(100vw - 400px)',
          overflowX: 'auto'
        }}>
          {
            sections.map(section => (
              <div key={section.id} style={{ width: '300px' }}>
                <Droppable key={section.id} droppableId={section.id}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ width: '300px', padding: '10px', marginRight: '10px' }}
                    >
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px'
                      }}>
                        <TextField
                          value={section.title}
                          onChange={(e) => updateSectionTitle(e, section.id)}
                          placeholder='Untitled'
                          variant='outlined'
                          sx={{
                            flexGrow: 1,
                            '& .MuiOutlinedInput-input': { padding: 0 },
                            '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                            '& .MuiOutlinedInput-root': { fontSize: '1rem', fontWeight: '700' }
                          }}
                        />
                        <IconButton
                          variant='outlined'
                          size='small'
                          sx={{
                            color: 'gray',
                            '&:hover': { color: 'green' }
                          }}
                          onClick={() => createTask(boardId, section.id)}
                        >
                          <AddOutlinedIcon />
                        </IconButton>
                        <IconButton
                          variant='outlined'
                          size='small'
                          sx={{
                            color: 'gray',
                            '&:hover': { color: 'red' }
                          }}
                          onClick={() => deleteSection(boardId, section.id)}
                        >
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </Box>
                      {/* tasks */}
                      {
                        section.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  padding: '10px',
                                  marginBottom: '10px',
                                  cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                                }}
                                onClick={() => openTaskModal(task)}
                              >
                                <Typography>
                                  {task.title === '' ? 'Untitled' : task.title}
                                </Typography>
                              </Card>
                            )}
                          </Draggable>
                        ))
                      }
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </div>
            ))
          }
        </Box>
      </DragDropContext>
      <TaskModal
        task={selectedTask}
        boardId={boardId}
        onClose={closeTaskModal}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </>
  )
}

export default Trello
