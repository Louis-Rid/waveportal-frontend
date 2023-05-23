const MessageHistory = ({ allWaves }) => {
  return (
    <>
      <div>
        <h2>Past Messages Sent</h2>
        {allWaves.map((wave, index) => {
          return (
            <div key={index} className="border-b border-slate-400">
              <p className="mb-2">
                {wave.address.substring(0, 8)}... said "{wave.message}"
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MessageHistory;
