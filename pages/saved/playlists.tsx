import localforage from 'localforage'
import { AppContext } from 'pages/app-context'
import { useContext, useEffect } from 'react'
import styled from 'styled-components/macro'

type SongType = {
  id: string
  title: string
  subtitle: string
  url: string
  image: string
}

const Content = styled.div`
  background-image: url('/assets/shape.svg');
  font-family: 'Vollkorn', serif;
  background-repeat: no-repeat;
  color: #9494F8;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2em;
  padding: 0 1em 6em;
`
const ListWrapper = styled.ul`
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  margin-top: 2.5em;
`

const ListItem = styled.li`
  list-style: none;
  max-width: 140px;
  margin: 0 auto;
  font-family: 'Mate', serif;
  color: #151A1C;
  text-align: start;
  cursor: pointer;
`

const SongCover = styled.img`
  width: 100%;
  max-width: 140px;
  aspect-ratio: 1/1;
`

const SongTitle = styled.h3`
  margin: 4px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Title = styled.h1`
  font-size: 36px;
  margin: 0;
  margin-top: 2em;
`

export default function Playlists () {
  const { playlists, updatePlaylists } = useContext(AppContext)

  useEffect(() => {
    async function getItem () {
      const data = await localforage.getItem<SongType[][]>('playlists')
      if (!data) return
      updatePlaylists(data)
      console.log(data)
    }

    getItem()
  }, [])

  if (playlists.length === 0) return <Content><span>no item</span></Content>

  return (
    <Content>
      <Title>Saved playlists</Title>

      <ListWrapper>
        {playlists.map(item => (
          <ListItem key={item[0].id}>
              <SongCover src={item[0].image} alt="Playlist cover" />

              <SongTitle>
                {item.map(item => [item.title]).join(', ')}
              </SongTitle>
          </ListItem>
        ))}
      </ListWrapper>
    </Content>
  )
}