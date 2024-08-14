type ErrorMessageProps = {
  text: string;
}

export default function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <>
      <div style={{
        marginBottom: 15,
      }}>{text}</div>
    </>
  );
};