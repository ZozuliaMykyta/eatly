"use client";
import { useGetUserQuery } from "@/lib/services/api";
import {
  IoPersonCircleSharp,
  IoHeart,
  IoReceipt,
  IoStar,
  IoWarning,
  IoMail,
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React from "react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const UserCard = ({ slug }: { slug: string }) => {
  const { data, error, isLoading } = useGetUserQuery();
  const user = data?.find((item) => item.jwtSecureCode === slug);

  const router = useRouter();

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="text-center">
          <AiOutlineLoading3Quarters className="animate-spin h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h5 className="text-xl font-semibold text-gray-700">
            Loading your profile...
          </h5>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoWarning className="w-8 h-8 text-red-500" />
          </div>
          <h5 className="text-xl font-semibold text-gray-800 mb-2">
            Oops! Something went wrong
          </h5>
          <p className="text-gray-600">
            We're having trouble loading your profile. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoPersonCircleSharp className="w-8 h-8 text-gray-500" />
          </div>
          <h5 className="text-xl font-semibold text-gray-800 mb-2">
            User not found
          </h5>
          <p className="text-gray-600">
            The user profile you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-orange-50 mt-10">
      <div className="container mx-auto px-4 py-3">
        <div className="max-w-2xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Background */}
            <div className="h-32 bg-gradient-to-r from-purple-600 to-orange-500 relative">
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            </div>

            {/* Profile Content */}
            <div className="relative px-8 pb-8">
              {/* Avatar */}
              <div className="flex justify-center -mt-16 mb-6">
                <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-white">
                  <IoPersonCircleSharp className="w-28 h-28 text-gray-400" />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {user.fullName}
                </h1>
                <div className="flex items-center justify-center text-gray-600 mb-4">
                  <IoMail className="w-5 h-5 mr-2" />
                  <span className="text-lg">{user.email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="text-center">
                <button
                  onClick={() => logOut()}
                  className="cursor-pointer px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Additional Stats or Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <IoHeart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Favorites</h3>
              <p className="text-gray-600 text-sm">Your saved restaurants</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <IoReceipt className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Orders</h3>
              <p className="text-gray-600 text-sm">Order history</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <IoStar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Reviews</h3>
              <p className="text-gray-600 text-sm">Your ratings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
