import classes from './starting-page.module.css';

function StartingPageContent() {
  // Show Link to Login page if NOT auth

  return (
    <section className={classes.starting}>
      <h1>Welcome to using Auth</h1>
    </section>
  );
}

export default StartingPageContent;
