/**
 * FavouriteList component to display and manage the favourite boards.
 * Allows reordering of the boards by dragging and dropping.
 * Provides functionality to update the favourite boards in the store and on the server.
 *
 * @returns {JSX.Element} The FavouriteList component.
 */
const FavouriteList = () => {
  const dispatch = useDispatch()
  const list = useSelector((state) => state.favourites.value)
  const [activeIndex, setActiveIndex] = useState(0)
  const { boardId } = useParams()

  useEffect(() => {
    /**
     * Fetches the favourite boards and updates the state.
     */
    const getBoards = async () => {
      try {
        const res = await boardApi.getFavourites()
        dispatch(setFavouriteList(res))
      } catch (err) {
        alert(err)
      }
    }
    getBoards()
  }, [])

  useEffect(() => {
    /**
     * Updates the active index based on the current board ID.
     */
    const index = list.findIndex(e => e.id === boardId)
    setActiveIndex(index)
  }, [list, boardId])

  const onDragEnd = async ({ source, destination }) => {
    /**
     * Updates the favourite boards in the store and on the server.
     */
    const newList = [...list]
    const [removed] = newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)

    const activeItem = newList.findIndex(e => e.id === boardId)
    setActiveIndex(activeItem)

    dispatch(setFavouriteList(newList))

    try {
      await boardApi.updateFavouritePosition({ boards: newList })
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <ListItem>
        <Box sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant='body2' fontWeight='700'>
            Favourites
          </Typography>
        </Box>
      </ListItem>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {
                list.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeIndex}
                        component={Link}
                        to={`/boards/${item.id}`}
                        sx={{
                          pl: '20px',
                          cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                        }}
                      >
                        <Typography
                          variant='body2'
                          fontWeight='700'
                          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default FavouriteList
