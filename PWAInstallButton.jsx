import React, { useEffect } from "react";

const FirebasePagination = () => {
  const [lastVisible, setLastVisible] = useState();

  useEffect(() => {
    let list = [];
    const x = async () => {
      setLoading(true);
      const q = query(
        collection(db, "personal_requests"),
        where("author_id", "==", userId),
        orderBy("created_at", "desc"),
        limit(8)
      );
      const querySnapshot = await getDocs(q);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({ id: doc.id, ...doc.data() });
      });
      setRequestsList(list);
      setLoading(false);
    };
    if (userId) {
      x();
    }
  }, [count, rem, submit, userId]);
  console.log("last visiblle", lastVisible);

  const onNext = async () => {
    console.log("start", lastVisible);
    let list = [];
    const next = query(
      collection(db, "personal_requests"),
      where("author_id", "==", userId),
      orderBy("created_at", "desc"),
      startAfter(lastVisible),
      limit(7)
    );

    const querySnapshot = await getDocs(next);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      list.push({ id: doc.id, ...doc.data() });
      console.log(list);
    });
    setRequestsList((prv) => [...prv, ...list]);
    console.log("end");
  };

  return (
    <div>
      {" "}
      {lastVisible && (
        <button
          className="bg-transparent hover:bg-[#7A9AB8] text-[#7A9AB8] font-semibold hover:text-white py-2 px-4 border border-[#7A9AB8] hover:border-transparent rounded text-2xl m-10"
          onClick={onNext}
        >
          see more..
        </button>
      )}
    </div>
  );
};

export default FirebasePagination;
