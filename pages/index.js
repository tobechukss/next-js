
import MeetupList from "../components/meetups/MeetupList"
import { MongoClient } from "mongodb"
import Head from "next/head"

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://cdn.britannica.com/08/190808-050-CB26C47B/The-Powerpuff-Girls-Bubbles-Blossom-Buttercup.jpg',
        address: 'Some address 5, 12345 Some City',
        description: 'This is a first meetup!'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://cdn.britannica.com/08/190808-050-CB26C47B/The-Powerpuff-Girls-Bubbles-Blossom-Buttercup.jpg',
        address: 'Some address 10, 12345 Some City',
        description: 'This is a second meetup!'
    }
]
function HomePage(props) {
    return (
        <>
        <Head>
            <title>React Meetups</title>
            <meta 
                name="description" 
                content='Browse a hige list of highly active React meetups'
                />
        </Head>
        <MeetupList meetups={props.meetups}/>
        </>
    )
}

// export async function getServerSideProps(context) {
//     //can run secret credentals here

//     const req = context.req
//     const res = context.res
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {

   // fetch('/api/meetups')

   const client = await MongoClient.connect('mongodb+srv://tobechukss:tchtaA97@cluster0.dpibbog.mongodb.net/meetups?retryWrites=true&w=majority')
       
   const db = client.db()

   const meetupsCollection = db.collection('meetups')

   const meetups = await meetupsCollection.find().toArray()

   client.close();
    return {
        props:{
            meetups: meetups.map((meetup)=> ({
                title: meetup.title,
                address:meetup.address,
                image: meetup.image,
                description: meetup.description,
                id: meetup._id.toString()
            }))
        },
         revalidate: 10
    }
}

export default HomePage;