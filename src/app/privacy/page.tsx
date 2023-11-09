import Head from "next/head";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>EasyTag</title>
      </Head>
      <div className="p-12">
        <h1 className="mb-2 text-4xl">Privacy Policy for Social Share</h1>
        <p><strong>Last Updated:</strong> 11/07/2023</p>

        <h2 className="mt-9 text-xl mb-2">Introduction</h2>
        <p className="pl-4">
          This Privacy Policy describes how Social Share, an application designed to enable the easy setup of OG tags in applications,
          collects, uses, and shares your personal information when you use our service. We are committed to protecting your personal
          information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards
          to your personal information, please contact us at admin@socialshare.dev.
        </p>

        <h2 className="mt-9 font-bold mb-2">Data Collection</h2>
        <ul className="pl-4">
          <li><strong>Personal Data:</strong> When you sign up for Social Share, we ask for your username and email address. This information is necessary to create your account and identify you as a user.</li>
          <li><strong>Website Information:</strong> We collect data from your website, such as your domain and the pages you have, to provide our service effectively.</li>
          <li><strong>Authentication:</strong> We use OAuth authentication to allow you to sign in to our application securely.</li>
          <li><strong>Cookies:</strong> Social Share uses session cookies to maintain your session and identify you as a current user. We also use Google Analytics to understand how our users interact with our application.</li>
        </ul>

        <h2 className="mt-9 font-bold mb-2">Use of Data</h2>
        <p className="pl-4">
          The data collected is used for the following purposes:
        </p>
        <ul className="pl-4">
          <li>To identify you as a user of the application.</li>
           <li>To provide you with the services of Social Share.</li>
           <li>For the operation and improvement of the Social Share application.</li>
          <li>For analytics purposes to enhance user experience.</li>
         </ul>
        

        <h2 className="mt-9 font-bold mb-2">Data Sharing</h2>
        <p className="pl-4">
          We do not share your personal data with any third parties, except for Google Analytics, which helps us understand how our application is used. We do not have control over how Google Analytics uses the data, and we recommend reviewing their privacy policy.
        </p>

        <h2 className="mt-9 font-bold mb-2">Data Security</h2>
        <p className="pl-4">
          We take the security of your data seriously. We recommend always access the website using the HTTPS protocol. We also use industry-standard encryption to protect your data in transit.
        </p>

        <h2 className="mt-9 font-bold mb-2">User Rights</h2>
        <p className="pl-4">
          As a user, you have the right to access the personal information we hold about you and to request that we correct, update, or delete it. You can usually do this using the settings and tools provided in your account.
        </p>

        <h2 className="mt-9 font-bold mb-2">International Users</h2>
        <p className="pl-4">
          While our application is available to users around the world, we store and process data in accordance with the laws of the jurisdiction in which the data is collected.
        </p>

        <h2 className="mt-9 font-bold mb-2">Changes to This Privacy Policy</h2>
        <p className="pl-4">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="mt-9 font-bold mb-2">Contact Us</h2>
        <p className="pl-4">
          If you have any questions about this Privacy Policy, please contact us at:
          <a className="underline ml-1" href="admin@socialshare.dev">admin@socialshare.dev</a>.
        </p>
      </div>
    </>
  );
}