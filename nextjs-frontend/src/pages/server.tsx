import { GetServerSideProps } from "next"

const ServerPage = (props: any) => {
  return (
    <h1>Welcome to Server Page, {props.name}</h1>
  )
}

export default ServerPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      name: 'Rafael Sousa'
    }
  }
}
