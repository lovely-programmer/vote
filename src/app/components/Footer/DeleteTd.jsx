"use client";

export default function DeleteTd({ id, socialMedia }) {
  const handleDelete = async () => {
    const res = await fetch(
      `https://www.voteforme.site/api/${socialMedia}/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) window.location.reload();
  };

  return (
    <td onClick={handleDelete} style={{ cursor: "pointer", color: "#dd2749" }}>
      <i className="fa-solid fa-trash"></i>
    </td>
  );
}
