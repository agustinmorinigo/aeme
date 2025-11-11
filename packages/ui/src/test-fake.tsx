export default function TestFake() {
  const getNumber = (): string => {
    return 'TEST COMMIT';
    // return Math.floor(Math.random() * 100);
  };

  return (
    <div>
      <p>TestFake TEST COMMIT {getNumber()}</p>
    </div>
  );
}
