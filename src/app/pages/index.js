import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Judo-Chain</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white border-4 border-dashed border-gray-200 rounded-lg p-8 shadow-lg">
              <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Welcome to Judo-Chain</h1>
              <p className="text-lg text-center mb-6 text-gray-600">
                Your trusted platform for Judo belt verification.
              </p>
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Introduction</h2>
                <p className="text-lg text-gray-600">
                  Judo-Chain leverages blockchain technology to ensure transparency and security in verifying Judo practitioners' belt ranks through community voting and immutable records.
                </p>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Features</h2>
                <ul className="list-disc pl-5 text-lg text-gray-600">
                  <li>Transparent belt verification</li>
                  <li>Community-driven voting</li>
                  <li>Secure and immutable records</li>
                  <li>User profile management</li>
                  <li>Event creation and management</li>
                  <li>Training logs and statistics</li>
                </ul>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">How It Works</h2>
                <ol className="list-decimal pl-5 text-lg text-gray-600">
                  <li>Register and create your profile.</li>
                  <li>Request belt verification.</li>
                  <li>Community votes on your verification request.</li>
                  <li>Track your training progress and participate in events.</li>
                </ol>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
